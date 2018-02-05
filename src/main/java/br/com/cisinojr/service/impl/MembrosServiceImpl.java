package br.com.cisinojr.service.impl;

import br.com.cisinojr.service.MembrosService;
import br.com.cisinojr.domain.Membros;
import br.com.cisinojr.repository.MembrosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Membros.
 */
@Service
@Transactional
public class MembrosServiceImpl implements MembrosService {

    private final Logger log = LoggerFactory.getLogger(MembrosServiceImpl.class);

    private final MembrosRepository membrosRepository;

    public MembrosServiceImpl(MembrosRepository membrosRepository) {
        this.membrosRepository = membrosRepository;
    }

    /**
     * Save a membros.
     *
     * @param membros the entity to save
     * @return the persisted entity
     */
    @Override
    public Membros save(Membros membros) {
        log.debug("Request to save Membros : {}", membros);
        return membrosRepository.save(membros);
    }

    /**
     * Get all the membros.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Membros> findAll(Pageable pageable) {
        log.debug("Request to get all Membros");
        return membrosRepository.findAll(pageable);
    }

    /**
     * Get one membros by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Membros findOne(Long id) {
        log.debug("Request to get Membros : {}", id);
        return membrosRepository.findOne(id);
    }

    /**
     * Delete the membros by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Membros : {}", id);
        membrosRepository.delete(id);
    }
}
