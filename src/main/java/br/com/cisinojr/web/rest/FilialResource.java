package br.com.cisinojr.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.cisinojr.domain.Filial;
import br.com.cisinojr.service.FilialService;
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
 * REST controller for managing Filial.
 */
@RestController
@RequestMapping("/api")
public class FilialResource {

    private final Logger log = LoggerFactory.getLogger(FilialResource.class);

    private static final String ENTITY_NAME = "filial";

    private final FilialService filialService;

    public FilialResource(FilialService filialService) {
        this.filialService = filialService;
    }

    /**
     * POST  /filials : Create a new filial.
     *
     * @param filial the filial to create
     * @return the ResponseEntity with status 201 (Created) and with body the new filial, or with status 400 (Bad Request) if the filial has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/filials")
    @Timed
    public ResponseEntity<Filial> createFilial(@Valid @RequestBody Filial filial) throws URISyntaxException {
        log.debug("REST request to save Filial : {}", filial);
        if (filial.getId() != null) {
            throw new BadRequestAlertException("A new filial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Filial result = filialService.save(filial);
        return ResponseEntity.created(new URI("/api/filials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /filials : Updates an existing filial.
     *
     * @param filial the filial to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated filial,
     * or with status 400 (Bad Request) if the filial is not valid,
     * or with status 500 (Internal Server Error) if the filial couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/filials")
    @Timed
    public ResponseEntity<Filial> updateFilial(@Valid @RequestBody Filial filial) throws URISyntaxException {
        log.debug("REST request to update Filial : {}", filial);
        if (filial.getId() == null) {
            return createFilial(filial);
        }
        Filial result = filialService.save(filial);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, filial.getId().toString()))
            .body(result);
    }

    /**
     * GET  /filials : get all the filials.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of filials in body
     */
    @GetMapping("/filials")
    @Timed
    public ResponseEntity<List<Filial>> getAllFilials(Pageable pageable) {
        log.debug("REST request to get a page of Filials");
        Page<Filial> page = filialService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/filials");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /filials/:id : get the "id" filial.
     *
     * @param id the id of the filial to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the filial, or with status 404 (Not Found)
     */
    @GetMapping("/filials/{id}")
    @Timed
    public ResponseEntity<Filial> getFilial(@PathVariable Long id) {
        log.debug("REST request to get Filial : {}", id);
        Filial filial = filialService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(filial));
    }

    /**
     * DELETE  /filials/:id : delete the "id" filial.
     *
     * @param id the id of the filial to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/filials/{id}")
    @Timed
    public ResponseEntity<Void> deleteFilial(@PathVariable Long id) {
        log.debug("REST request to delete Filial : {}", id);
        filialService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
