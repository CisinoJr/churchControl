package br.com.cisinojr.web.rest;

import br.com.cisinojr.ChurchControlApp;

import br.com.cisinojr.domain.Membros;
import br.com.cisinojr.repository.MembrosRepository;
import br.com.cisinojr.service.MembrosService;
import br.com.cisinojr.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static br.com.cisinojr.web.rest.TestUtil.sameInstant;
import static br.com.cisinojr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MembrosResource REST controller.
 *
 * @see MembrosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChurchControlApp.class)
public class MembrosResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_CELULAR = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATA_NASCIMENTO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATA_NASCIMENTO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private MembrosRepository membrosRepository;

    @Autowired
    private MembrosService membrosService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMembrosMockMvc;

    private Membros membros;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MembrosResource membrosResource = new MembrosResource(membrosService);
        this.restMembrosMockMvc = MockMvcBuilders.standaloneSetup(membrosResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Membros createEntity(EntityManager em) {
        Membros membros = new Membros()
            .nome(DEFAULT_NOME)
            .telefone(DEFAULT_TELEFONE)
            .celular(DEFAULT_CELULAR)
            .email(DEFAULT_EMAIL)
            .dataNascimento(DEFAULT_DATA_NASCIMENTO);
        return membros;
    }

    @Before
    public void initTest() {
        membros = createEntity(em);
    }

    @Test
    @Transactional
    public void createMembros() throws Exception {
        int databaseSizeBeforeCreate = membrosRepository.findAll().size();

        // Create the Membros
        restMembrosMockMvc.perform(post("/api/membros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membros)))
            .andExpect(status().isCreated());

        // Validate the Membros in the database
        List<Membros> membrosList = membrosRepository.findAll();
        assertThat(membrosList).hasSize(databaseSizeBeforeCreate + 1);
        Membros testMembros = membrosList.get(membrosList.size() - 1);
        assertThat(testMembros.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testMembros.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testMembros.getCelular()).isEqualTo(DEFAULT_CELULAR);
        assertThat(testMembros.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testMembros.getDataNascimento()).isEqualTo(DEFAULT_DATA_NASCIMENTO);
    }

    @Test
    @Transactional
    public void createMembrosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = membrosRepository.findAll().size();

        // Create the Membros with an existing ID
        membros.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMembrosMockMvc.perform(post("/api/membros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membros)))
            .andExpect(status().isBadRequest());

        // Validate the Membros in the database
        List<Membros> membrosList = membrosRepository.findAll();
        assertThat(membrosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = membrosRepository.findAll().size();
        // set the field null
        membros.setNome(null);

        // Create the Membros, which fails.

        restMembrosMockMvc.perform(post("/api/membros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membros)))
            .andExpect(status().isBadRequest());

        List<Membros> membrosList = membrosRepository.findAll();
        assertThat(membrosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelefoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = membrosRepository.findAll().size();
        // set the field null
        membros.setTelefone(null);

        // Create the Membros, which fails.

        restMembrosMockMvc.perform(post("/api/membros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membros)))
            .andExpect(status().isBadRequest());

        List<Membros> membrosList = membrosRepository.findAll();
        assertThat(membrosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = membrosRepository.findAll().size();
        // set the field null
        membros.setEmail(null);

        // Create the Membros, which fails.

        restMembrosMockMvc.perform(post("/api/membros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membros)))
            .andExpect(status().isBadRequest());

        List<Membros> membrosList = membrosRepository.findAll();
        assertThat(membrosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataNascimentoIsRequired() throws Exception {
        int databaseSizeBeforeTest = membrosRepository.findAll().size();
        // set the field null
        membros.setDataNascimento(null);

        // Create the Membros, which fails.

        restMembrosMockMvc.perform(post("/api/membros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membros)))
            .andExpect(status().isBadRequest());

        List<Membros> membrosList = membrosRepository.findAll();
        assertThat(membrosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMembros() throws Exception {
        // Initialize the database
        membrosRepository.saveAndFlush(membros);

        // Get all the membrosList
        restMembrosMockMvc.perform(get("/api/membros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(membros.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())))
            .andExpect(jsonPath("$.[*].celular").value(hasItem(DEFAULT_CELULAR.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].dataNascimento").value(hasItem(sameInstant(DEFAULT_DATA_NASCIMENTO))));
    }

    @Test
    @Transactional
    public void getMembros() throws Exception {
        // Initialize the database
        membrosRepository.saveAndFlush(membros);

        // Get the membros
        restMembrosMockMvc.perform(get("/api/membros/{id}", membros.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(membros.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()))
            .andExpect(jsonPath("$.celular").value(DEFAULT_CELULAR.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.dataNascimento").value(sameInstant(DEFAULT_DATA_NASCIMENTO)));
    }

    @Test
    @Transactional
    public void getNonExistingMembros() throws Exception {
        // Get the membros
        restMembrosMockMvc.perform(get("/api/membros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMembros() throws Exception {
        // Initialize the database
        membrosService.save(membros);

        int databaseSizeBeforeUpdate = membrosRepository.findAll().size();

        // Update the membros
        Membros updatedMembros = membrosRepository.findOne(membros.getId());
        // Disconnect from session so that the updates on updatedMembros are not directly saved in db
        em.detach(updatedMembros);
        updatedMembros
            .nome(UPDATED_NOME)
            .telefone(UPDATED_TELEFONE)
            .celular(UPDATED_CELULAR)
            .email(UPDATED_EMAIL)
            .dataNascimento(UPDATED_DATA_NASCIMENTO);

        restMembrosMockMvc.perform(put("/api/membros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMembros)))
            .andExpect(status().isOk());

        // Validate the Membros in the database
        List<Membros> membrosList = membrosRepository.findAll();
        assertThat(membrosList).hasSize(databaseSizeBeforeUpdate);
        Membros testMembros = membrosList.get(membrosList.size() - 1);
        assertThat(testMembros.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testMembros.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testMembros.getCelular()).isEqualTo(UPDATED_CELULAR);
        assertThat(testMembros.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testMembros.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingMembros() throws Exception {
        int databaseSizeBeforeUpdate = membrosRepository.findAll().size();

        // Create the Membros

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMembrosMockMvc.perform(put("/api/membros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membros)))
            .andExpect(status().isCreated());

        // Validate the Membros in the database
        List<Membros> membrosList = membrosRepository.findAll();
        assertThat(membrosList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMembros() throws Exception {
        // Initialize the database
        membrosService.save(membros);

        int databaseSizeBeforeDelete = membrosRepository.findAll().size();

        // Get the membros
        restMembrosMockMvc.perform(delete("/api/membros/{id}", membros.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Membros> membrosList = membrosRepository.findAll();
        assertThat(membrosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Membros.class);
        Membros membros1 = new Membros();
        membros1.setId(1L);
        Membros membros2 = new Membros();
        membros2.setId(membros1.getId());
        assertThat(membros1).isEqualTo(membros2);
        membros2.setId(2L);
        assertThat(membros1).isNotEqualTo(membros2);
        membros1.setId(null);
        assertThat(membros1).isNotEqualTo(membros2);
    }
}
