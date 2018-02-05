package br.com.cisinojr.service;

import br.com.cisinojr.domain.Filial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Filial.
 */
public interface FilialService {

    /**
     * Save a filial.
     *
     * @param filial the entity to save
     * @return the persisted entity
     */
    Filial save(Filial filial);

    /**
     * Get all the filials.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Filial> findAll(Pageable pageable);

    /**
     * Get the "id" filial.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Filial findOne(Long id);

    /**
     * Delete the "id" filial.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
