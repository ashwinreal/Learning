package com.ashwin.spring.rest.cloud.springrestmicro.user;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponents;
import org.springframework.hateoas.EntityModel;
@RestController
public class UserResource {
	
	@Autowired
	private UserDaoService userService;
	
	@GetMapping(path="/users")
	public List<User> getAllUsers(){
		return userService.findAll();
	}
	
	@GetMapping(path="/users/{id}")
	public Resource<User> getAllUsers(@PathVariable int id){
		User user = userService.findOne(id);
		if(user == null) {
			throw new UserNotFoundException("id-"+id);
		}
		
//		 HATEAOS
		EntityModel<User> model = new EntityModel<>(user.get());
		WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).retrieveAllUsers());
		model.add(linkTo.withRel("all-users"));
		return resource;
	}
	
	@PostMapping(path="/users")
	public ResponseEntity<Object> createUser(@Valid @RequestBody User user) {
		User usr = userService.save(user);
		URI location = URI.create(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(usr.getId()).toUriString());
		return ResponseEntity.created(location).build();
	}

}
