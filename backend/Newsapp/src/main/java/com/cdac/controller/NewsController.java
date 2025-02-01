package com.cdac.controller;

import com.cdac.entities.News;
import com.cdac.entities.User;
import com.cdac.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsRepository newsRepository;

    @GetMapping
    public List<News> getAllApprovedNews() {
        return newsRepository.findByApprovedTrue();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNews(@RequestBody News news, @AuthenticationPrincipal User user) {
        news.setAuthor(user);
        newsRepository.save(news);
        return ResponseEntity.ok("News submitted for approval");
    }

    @GetMapping("/pending")
    public List<News> getPendingNews() {
        return newsRepository.findByApprovedFalse();
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<?> approveNews(@PathVariable Long id) {
        News news = newsRepository.findById(id).orElseThrow();
        news.setApproved(true);
        newsRepository.save(news);
        return ResponseEntity.ok("News approved");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        newsRepository.deleteById(id);
        return ResponseEntity.ok("News deleted");
    }
}
