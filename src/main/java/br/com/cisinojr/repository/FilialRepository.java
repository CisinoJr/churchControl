package br.com.cisinojr.repository;

import br.com.cisinojr.domain.Filial;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Filial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilialRepository extends JpaRepository<Filial, Long> {

}
