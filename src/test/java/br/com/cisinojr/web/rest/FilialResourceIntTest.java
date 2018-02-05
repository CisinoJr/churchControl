package br.com.cisinojr.web.rest;

import br.com.cisinojr.ChurchControlApp;

import br.com.cisinojr.domain.Filial;
import br.com.cisinojr.repository.FilialRepository;
import br.com.cisinojr.service.FilialService;
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
import java.util.List;

import static br.com.cisinojr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FilialResource REST controller.
 *
 * @see FilialResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChurchControlApp.class)
public class FilialResourceIntTest {

    private static final String DEFAULT_RAZAO_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZAO_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_CNPJ = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    @Autowired
    private FilialRepository filialRepository;

    @Autowired
    private FilialService filialService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFilialMockMvc;

    private Filial filial;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FilialResource filialResource = new FilialResource(filialService);
        this.restFilialMockMvc = MockMvcBuilders.standaloneSetup(filialResource)
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
    public static Filial createEntity(EntityManager em) {
        Filial filial = new Filial()
            .razaoSocial(DEFAULT_RAZAO_SOCIAL)
            .cnpj(DEFAULT_CNPJ)
            .tipo(DEFAULT_TIPO)
            .telefone(DEFAULT_TELEFONE);
        return filial;
    }

    @Before
    public void initTest() {
        filial = createEntity(em);
    }

    @Test
    @Transactional
    public void createFilial() throws Exception {
        int databaseSizeBeforeCreate = filialRepository.findAll().size();

        // Create the Filial
        restFilialMockMvc.perform(post("/api/filials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filial)))
            .andExpect(status().isCreated());

        // Validate the Filial in the database
        List<Filial> filialList = filialRepository.findAll();
        assertThat(filialList).hasSize(databaseSizeBeforeCreate + 1);
        Filial testFilial = filialList.get(filialList.size() - 1);
        assertThat(testFilial.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
        assertThat(testFilial.getCnpj()).isEqualTo(DEFAULT_CNPJ);
        assertThat(testFilial.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testFilial.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
    }

    @Test
    @Transactional
    public void createFilialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = filialRepository.findAll().size();

        // Create the Filial with an existing ID
        filial.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFilialMockMvc.perform(post("/api/filials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filial)))
            .andExpect(status().isBadRequest());

        // Validate the Filial in the database
        List<Filial> filialList = filialRepository.findAll();
        assertThat(filialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRazaoSocialIsRequired() throws Exception {
        int databaseSizeBeforeTest = filialRepository.findAll().size();
        // set the field null
        filial.setRazaoSocial(null);

        // Create the Filial, which fails.

        restFilialMockMvc.perform(post("/api/filials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filial)))
            .andExpect(status().isBadRequest());

        List<Filial> filialList = filialRepository.findAll();
        assertThat(filialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCnpjIsRequired() throws Exception {
        int databaseSizeBeforeTest = filialRepository.findAll().size();
        // set the field null
        filial.setCnpj(null);

        // Create the Filial, which fails.

        restFilialMockMvc.perform(post("/api/filials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filial)))
            .andExpect(status().isBadRequest());

        List<Filial> filialList = filialRepository.findAll();
        assertThat(filialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = filialRepository.findAll().size();
        // set the field null
        filial.setTipo(null);

        // Create the Filial, which fails.

        restFilialMockMvc.perform(post("/api/filials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filial)))
            .andExpect(status().isBadRequest());

        List<Filial> filialList = filialRepository.findAll();
        assertThat(filialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFilials() throws Exception {
        // Initialize the database
        filialRepository.saveAndFlush(filial);

        // Get all the filialList
        restFilialMockMvc.perform(get("/api/filials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(filial.getId().intValue())))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].cnpj").value(hasItem(DEFAULT_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())));
    }

    @Test
    @Transactional
    public void getFilial() throws Exception {
        // Initialize the database
        filialRepository.saveAndFlush(filial);

        // Get the filial
        restFilialMockMvc.perform(get("/api/filials/{id}", filial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(filial.getId().intValue()))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL.toString()))
            .andExpect(jsonPath("$.cnpj").value(DEFAULT_CNPJ.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFilial() throws Exception {
        // Get the filial
        restFilialMockMvc.perform(get("/api/filials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFilial() throws Exception {
        // Initialize the database
        filialService.save(filial);

        int databaseSizeBeforeUpdate = filialRepository.findAll().size();

        // Update the filial
        Filial updatedFilial = filialRepository.findOne(filial.getId());
        // Disconnect from session so that the updates on updatedFilial are not directly saved in db
        em.detach(updatedFilial);
        updatedFilial
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .cnpj(UPDATED_CNPJ)
            .tipo(UPDATED_TIPO)
            .telefone(UPDATED_TELEFONE);

        restFilialMockMvc.perform(put("/api/filials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFilial)))
            .andExpect(status().isOk());

        // Validate the Filial in the database
        List<Filial> filialList = filialRepository.findAll();
        assertThat(filialList).hasSize(databaseSizeBeforeUpdate);
        Filial testFilial = filialList.get(filialList.size() - 1);
        assertThat(testFilial.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testFilial.getCnpj()).isEqualTo(UPDATED_CNPJ);
        assertThat(testFilial.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testFilial.getTelefone()).isEqualTo(UPDATED_TELEFONE);
    }

    @Test
    @Transactional
    public void updateNonExistingFilial() throws Exception {
        int databaseSizeBeforeUpdate = filialRepository.findAll().size();

        // Create the Filial

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFilialMockMvc.perform(put("/api/filials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filial)))
            .andExpect(status().isCreated());

        // Validate the Filial in the database
        List<Filial> filialList = filialRepository.findAll();
        assertThat(filialList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFilial() throws Exception {
        // Initialize the database
        filialService.save(filial);

        int databaseSizeBeforeDelete = filialRepository.findAll().size();

        // Get the filial
        restFilialMockMvc.perform(delete("/api/filials/{id}", filial.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Filial> filialList = filialRepository.findAll();
        assertThat(filialList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Filial.class);
        Filial filial1 = new Filial();
        filial1.setId(1L);
        Filial filial2 = new Filial();
        filial2.setId(filial1.getId());
        assertThat(filial1).isEqualTo(filial2);
        filial2.setId(2L);
        assertThat(filial1).isNotEqualTo(filial2);
        filial1.setId(null);
        assertThat(filial1).isNotEqualTo(filial2);
    }
}
