package br.com.cisinojr.service.impl;

import br.com.cisinojr.service.FilialService;
import br.com.cisinojr.domain.Filial;
import br.com.cisinojr.repository.FilialRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Filial.
 */
@Service
@Transactional
public class FilialServiceImpl implements FilialService {

    private final Logger log = LoggerFactory.getLogger(FilialServiceImpl.class);

    private final FilialRepository filialRepository;

    public FilialServiceImpl(FilialRepository filialRepository) {
        this.filialRepository = filialRepository;
    }

    /**
     * Save a filial.
     *
     * @param filial the entity to save
     * @return the persisted entity
     */
    @Override
    public Filial save(Filial filial) {
        log.debug("Request to save Filial : {}", filial);
        return filialRepository.save(filial);
    }

    /**
     * Get all the filials.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Filial> findAll(Pageable pageable) {
        log.debug("Request to get all Filials");
        return filialRepository.findAll(pageable);
    }

    /**
     * Get one filial by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Filial findOne(Long id) {
        log.debug("Request to get Filial : {}", id);
        return filialRepository.findOne(id);
    }

    /**
     * Delete the filial by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Filial : {}", id);
        filialRepository.delete(id);
    }
}
