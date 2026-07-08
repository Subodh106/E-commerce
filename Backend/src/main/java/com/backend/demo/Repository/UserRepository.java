package com.backend.demo.Repository;

import com.backend.demo.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
boolean existsByEmail(String email);
boolean existsByUsername(String username);

}
