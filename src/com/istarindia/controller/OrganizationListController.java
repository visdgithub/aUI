package com.istarindia.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;
import com.istarindia.ResponseObject;
import com.istarindia.apps.dao.Address;
import com.istarindia.apps.dao.AddressDAO;
import com.istarindia.apps.dao.IstarUser;
import com.istarindia.apps.dao.IstarUserDAO;
import com.istarindia.apps.dao.Organization;
import com.istarindia.apps.dao.OrganizationDAO;
import com.istarindia.apps.dao.Student;
import com.istarindia.apps.services.OrganizationService;
import com.istarindia.apps.services.UserService;
import com.fasterxml.jackson.core.JsonGenerationException;

/**
 * Servlet implementation class OrganizationListController
 */
@WebServlet("/orglist")
public class OrganizationListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ObjectMapper mapper = new ObjectMapper();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrganizationListController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		response.setContentType("application/json");
		List<Organization> list = new OrganizationService().getAllOrgByOrgtype(request.getParameter("orgtype"));
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
