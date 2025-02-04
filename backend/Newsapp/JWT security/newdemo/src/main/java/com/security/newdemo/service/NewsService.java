package com.security.newdemo.service;

import com.security.newdemo.dao.NewsRepository;
import com.security.newdemo.entity.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class NewsService {
    @Autowired
    private NewsRepository newsRepository;
    // Get news by ID
    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    // Save (used for both creating and updating)
    public News saveNews(News news) {
        return newsRepository.save(news);
    }
}
