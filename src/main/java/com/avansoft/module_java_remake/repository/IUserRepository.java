package com.avansoft.module_java_remake.repository;

import com.avansoft.module_java_remake.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User, Long> {

}
