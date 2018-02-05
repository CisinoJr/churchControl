package br.com.cisinojr.repository;

import br.com.cisinojr.domain.Membros;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Membros entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MembrosRepository extends JpaRepository<Membros, Long> {

}
