package com.example.helloworld;

public record Greeting(long id, String content) {
    public Greeting (long id, String content) {
        this.id = id;
        this.content = String.format("Hello, %s!", content);
    }
}
