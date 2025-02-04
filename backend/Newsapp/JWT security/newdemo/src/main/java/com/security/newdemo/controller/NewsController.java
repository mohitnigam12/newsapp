package com.security.newdemo.controller;

import com.security.newdemo.dao.NewsRepository;
import com.security.newdemo.entity.News;
import com.security.newdemo.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/news")
class NewsController {
    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private NewsService newsService;

    // Add news with isApproved set to false
    @PostMapping
    public ResponseEntity<News> addNews(@RequestBody News news) {
        news.setIsApproved(false);  // News requires admin approval
        News savedNews = newsRepository.save(news);
        return new ResponseEntity<>(savedNews, HttpStatus.CREATED);
    }

    // Get only approved news
    @GetMapping
    public List<News> getAllApprovedNews() {
        return newsRepository.findByIsApprovedTrue();
    }

    // Get pending news for admin review
    @GetMapping("/pending")
    public List<News> getPendingNews() {
        return newsRepository.findByIsApprovedFalse();
    }

    // Approve news by ID
    @PutMapping("/approve/{id}")
    public ResponseEntity<News> approveNews(@PathVariable Long id) {
        Optional<News> newsOptional = newsService.getNewsById(id);

        if (newsOptional.isPresent()) {
            News news = newsOptional.get();
            news.setIsApproved(true);  // Mark as approved
            News approvedNews = newsService.saveNews(news);
            return ResponseEntity.ok(approvedNews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete news by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        if (newsRepository.existsById(id)) {
            newsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update existing news
    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody News updatedNews) {
        Optional<News> newsOptional = newsService.getNewsById(id);

        if (newsOptional.isPresent()) {
            News news = newsOptional.get();
            news.setAuthor(updatedNews.getAuthor());
            news.setTitle(updatedNews.getTitle());
            news.setDescription(updatedNews.getDescription());
            news.setUrl(updatedNews.getUrl());
            news.setUrlToImage(updatedNews.getUrlToImage());
            News savedNews = newsService.saveNews(news);
            return ResponseEntity.ok(savedNews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
