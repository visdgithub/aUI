package com.istarindia.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;
import com.istarindia.ResponseObject;
import com.istarindia.apps.dao.IstarUser;
import com.istarindia.apps.dao.IstarUserDAO;
import com.istarindia.apps.dao.Organization;
import com.istarindia.apps.services.OrganizationService;
import com.istarindia.apps.services.UserService;

/**
 * Servlet implementation class UserListController
 */
@WebServlet("/userlistcontroller")
public class UserListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ObjectMapper mapper = new ObjectMapper();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserListController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		List<IstarUser> list = new UserService().getUserListByType(request.getParameter("usertype"));
		//Organization o = new OrganizationDAO().findById(1);
		//IstarUser o = new IstarUserDAO().findById(27); 
		//Address o = new AddressDAO().findById(1);
		//IstarUser o = new IstarUserDAO().findById(27);
		//Student stu=new UserService().createStudent("a@g","aa", "ddd", "MALE", mobileNum, name, password, organization_id, pincode, addressline1, addressline2)
		
		ResponseObject obj = new ResponseObject("NO_ERROR","OK",list);
		mapper.registerModule(new Hibernate4Module());
		String jsonstring = mapper.writeValueAsString(obj);
		
		PrintWriter out = response.getWriter();
		out.println(jsonstring);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
