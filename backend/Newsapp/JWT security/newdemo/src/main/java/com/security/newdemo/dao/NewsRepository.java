package com.security.newdemo.dao;

import com.security.newdemo.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.security.newdemo.entity.User;

import java.util.List;


@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findByIsApprovedTrue();

    List<News> findByIsApprovedFalse();
}