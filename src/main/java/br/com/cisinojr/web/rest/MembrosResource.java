package br.com.cisinojr.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.cisinojr.domain.Membros;
import br.com.cisinojr.service.MembrosService;
import br.com.cisinojr.web.rest.errors.BadRequestAlertException;
import br.com.cisinojr.web.rest.util.HeaderUtil;
import br.com.cisinojr.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Membros.
 */
@RestController
@RequestMapping("/api")
public class MembrosResource {

    private final Logger log = LoggerFactory.getLogger(MembrosResource.class);

    private static final String ENTITY_NAME = "membros";

    private final MembrosService membrosService;

    public MembrosResource(MembrosService membrosService) {
        this.membrosService = membrosService;
    }

    /**
     * POST  /membros : Create a new membros.
     *
     * @param membros the membros to create
     * @return the ResponseEntity with status 201 (Created) and with body the new membros, or with status 400 (Bad Request) if the membros has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/membros")
    @Timed
    public ResponseEntity<Membros> createMembros(@Valid @RequestBody Membros membros) throws URISyntaxException {
        log.debug("REST request to save Membros : {}", membros);
        if (membros.getId() != null) {
            throw new BadRequestAlertException("A new membros cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Membros result = membrosService.save(membros);
        return ResponseEntity.created(new URI("/api/membros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /membros : Updates an existing membros.
     *
     * @param membros the membros to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated membros,
     * or with status 400 (Bad Request) if the membros is not valid,
     * or with status 500 (Internal Server Error) if the membros couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/membros")
    @Timed
    public ResponseEntity<Membros> updateMembros(@Valid @RequestBody Membros membros) throws URISyntaxException {
        log.debug("REST request to update Membros : {}", membros);
        if (membros.getId() == null) {
            return createMembros(membros);
        }
        Membros result = membrosService.save(membros);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, membros.getId().toString()))
            .body(result);
    }

    /**
     * GET  /membros : get all the membros.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of membros in body
     */
    @GetMapping("/membros")
    @Timed
    public ResponseEntity<List<Membros>> getAllMembros(Pageable pageable) {
        log.debug("REST request to get a page of Membros");
        Page<Membros> page = membrosService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/membros");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /membros/:id : get the "id" membros.
     *
     * @param id the id of the membros to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the membros, or with status 404 (Not Found)
     */
    @GetMapping("/membros/{id}")
    @Timed
    public ResponseEntity<Membros> getMembros(@PathVariable Long id) {
        log.debug("REST request to get Membros : {}", id);
        Membros membros = membrosService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(membros));
    }

    /**
     * DELETE  /membros/:id : delete the "id" membros.
     *
     * @param id the id of the membros to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/membros/{id}")
    @Timed
    public ResponseEntity<Void> deleteMembros(@PathVariable Long id) {
        log.debug("REST request to delete Membros : {}", id);
        membrosService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
