package br.com.cisinojr.service;

import br.com.cisinojr.domain.Membros;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Membros.
 */
public interface MembrosService {

    /**
     * Save a membros.
     *
     * @param membros the entity to save
     * @return the persisted entity
     */
    Membros save(Membros membros);

    /**
     * Get all the membros.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Membros> findAll(Pageable pageable);

    /**
     * Get the "id" membros.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Membros findOne(Long id);

    /**
     * Delete the "id" membros.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
