package com.istarindia;

public class ResponseObject {

	String errorMessage;
	String statusCode;
	Object payload;
	public ResponseObject(String errorMessage, String statusCode, Object payload) {
		super();
		this.errorMessage = errorMessage;
		this.statusCode = statusCode;
		this.payload = payload;
	}
	public ResponseObject() {
		super();
	}
	
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public String getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
	public Object getPayload() {
		return payload;
	}
	public void setPayload(Object payload) {
		this.payload = payload;
	}
}
