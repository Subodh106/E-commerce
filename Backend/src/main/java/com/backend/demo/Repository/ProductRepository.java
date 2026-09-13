package com.backend.demo.Repository;

import com.backend.demo.Entities.Product;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ProductRepository extends JpaRepository<Product, Long> , JpaSpecificationExecutor<Product> {
  Page<Product> findAll(@NonNull Specification<Product> specification, @NonNull Pageable pageable);
}