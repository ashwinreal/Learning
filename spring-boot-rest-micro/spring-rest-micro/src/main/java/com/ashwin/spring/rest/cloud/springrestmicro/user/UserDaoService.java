package com.ashwin.spring.rest.cloud.springrestmicro.user;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class UserDaoService {
	private static List<User> users = new ArrayList<User>();
	static {
		users.add(new User(0, "User1", new Date()));
		users.add(new User(1, "User2", new Date()));
		users.add(new User(2, "User3", new Date()));
	}
	
	public List<User> findAll() {
		return users;
	}
	
	public User save(User user) {
		if(user.getId() == null) {
			user.setId(users.size());
		}
		users.add(user);
		return user;
	}
	public User findOne(int id) {
		for(User user: users){
			if(user.getId() == id) return user;
		}
		return null;
	}
}
