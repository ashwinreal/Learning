package com.ashwin.spring.rest.cloud.springrestmicro.helloworld;

public class HelloWorldBean {
	
	private String message;
	
	public HelloWorldBean(String string) {
		// TODO Auto-generated constructor stub
		this.message = string;
	}
	
	public void setMessage(String string) {
		this.message = string;
	}
	
	@Override
	public String toString() {
		return String.format("HelloWorldBean [message=%s]", message);
	}

	public String getMessage() {
		return message;
	}

}
