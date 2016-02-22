package com.istarindia.controller.auth;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.istarindia.ResponseObject;
import com.istarindia.apps.dao.IstarUserDAO;
import com.istarindia.apps.services.UserService;

/**
 * Servlet implementation class ForgotPasswordController
 */
@WebServlet("/auth/forgot")
public class ForgotPasswordController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ObjectMapper mapper = new ObjectMapper();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ForgotPasswordController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		if(new IstarUserDAO().findByEmail(request.getParameter("email")).get(0)!=null)
		{
			String token = new UserService().forgotPassword(request.getParameter("email"));
			response.setContentType("application/json");
			ResponseObject obj = new ResponseObject("NO_ERROR","OK",token);
			String jsonstring = mapper.writeValueAsString(obj);
			PrintWriter out = response.getWriter();
			out.println(jsonstring);
			
		}
		else
		{
			ResponseObject obj = new ResponseObject("NO_ERROR","OK","No User is registered with this email");
			String jsonstring = mapper.writeValueAsString(obj);
			PrintWriter out = response.getWriter();
			out.println(jsonstring);
		}	
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
