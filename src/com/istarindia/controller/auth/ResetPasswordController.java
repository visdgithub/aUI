package com.istarindia.controller.auth;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.istarindia.ResponseObject;
import com.istarindia.apps.dao.IstarUser;
import com.istarindia.apps.dao.IstarUserDAO;

/**
 * Servlet implementation class ResetPasswordController
 */
@WebServlet("/auth/resetPassword")
public class ResetPasswordController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ObjectMapper mapper = new ObjectMapper();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ResetPasswordController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		if(request.getParameterMap().containsKey("istarToken") && request.getParameterMap().containsKey("password"))
		{
			IstarUserDAO dao = new IstarUserDAO();
			IstarUser user = dao.findByIstarAuthorizationToken(request.getParameter("istarToken")).get(0);
			if(user!=null)
			{
				user.setPassword(request.getParameter("password"));
				user.setIstarAuthorizationToken("");
				Session session = dao.getSession();
				Transaction tx = null;
				try {
					tx = session.beginTransaction();

					dao.attachDirty(user);
					tx.commit();
				} catch (HibernateException e) {
					if (tx != null)
						tx.rollback();
					e.printStackTrace();
				} finally {
					session.close();
				}
				
				response.setContentType("application/json");
				ResponseObject obj = new ResponseObject("NO_ERROR","OK","Password Reset Successfully");
				String jsonstring = mapper.writeValueAsString(obj);
				
				PrintWriter out = response.getWriter();
				out.println(jsonstring);
			}
			else
			{
				response.setContentType("application/json");
				ResponseObject obj = new ResponseObject("ERROR","ERROR","Invalid Token");
				String jsonstring = mapper.writeValueAsString(obj);
				
				PrintWriter out = response.getWriter();
				out.println(jsonstring);
			}	
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
