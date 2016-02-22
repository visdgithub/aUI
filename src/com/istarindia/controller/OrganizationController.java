package com.istarindia.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.istarindia.ResponseObject;
import com.istarindia.apps.services.OrganizationService;

/**
 * Servlet implementation class OrganizationController
 */
@WebServlet("/organization/createOrg")
public class OrganizationController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ObjectMapper mapper = new ObjectMapper();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrganizationController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		String jsonstring="";
		if (request.getParameterMap().containsKey("orgtype") && request.getParameterMap().containsKey("orgname") && request.getParameterMap().containsKey("pincode") && request.getParameterMap().containsKey("addressline1") && request.getParameterMap().containsKey("addressline2") && request.getParameterMap().containsKey("maxstudent")) 
			{
				int maxStudents = Integer.parseInt(request.getParameter("maxstudent"));
				String companyName = request.getParameter("orgname");
				String addressline1 = request.getParameter("addressline1");
				String addressline2 = request.getParameter("addressline2");
				int pincode = Integer.parseInt(request.getParameter("pincode"));
				String orgtype = request.getParameter("orgtype");
				new OrganizationService().createOrganization(maxStudents, companyName, addressline1, addressline2, pincode, orgtype);
				
				ResponseObject obj = new ResponseObject("NO_ERROR","OK","Organization Created Successfully");
				jsonstring = mapper.writeValueAsString(obj);
				
				
			}
		else
		{
			ResponseObject obj = new ResponseObject("ERROR","ERROR","Mandatory Fields Missing");
			jsonstring = mapper.writeValueAsString(obj);
		}
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
