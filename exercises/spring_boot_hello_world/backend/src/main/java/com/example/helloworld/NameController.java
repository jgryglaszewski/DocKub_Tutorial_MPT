package com.example.helloworld;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.stream.Collectors;

@RestController 
public class NameController {
    private final NameRepository nameRepository;

    public NameController(NameRepository nameRepository) {
        this.nameRepository = nameRepository;
    }

    @GetMapping ("/names")
    public List<Name> getAllNames() {
        return nameRepository.findAll();
    }

    @PostMapping ("/greeting")
    public Greeting createGreeting(@RequestBody Name name) {
        Name savedName = nameRepository.save(name);
        return new Greeting(savedName.getId(), savedName.getName());
    }

    @GetMapping ("/names/count")
    public List<NameCount> countAllNames() {
        List<Name> names = nameRepository.findAll();
        return names.stream()
                .collect(Collectors.groupingBy((name) -> name.getName().toUpperCase(), Collectors.counting()))
                .entrySet()
                .stream()
                .map(e -> new NameCount(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
    }

    @GetMapping ("/names/count/{name}")
    public NameCount countNamesByName(@PathVariable String name) {
        List<Name> names = nameRepository.findAll();
        return new NameCount(name, names.stream().filter(n -> n.getName().toUpperCase().equals(name.toUpperCase())).count());
    }
}
