/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ctrl;



import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author LakmalB
 */
public class AuthenticateFilter implements Filter {
    
    private static final String JWT_TOKEN_COOKIE_NAME = "JWT-TOKEN";
    private static final String SIGNING_KEY = "signingKey";
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        //

        System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%");
        //read property file
        String path = "/accounts/login?redirect=";  //velocity-accounts-1.0 accounts
        //String path = "http://localhost:8080/accounts/login?redirect=";
//create redirect path 
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpresp = (HttpServletResponse) response;
        
        String headerName = httpRequest.getHeader("X-requested-with");
        
        String cookieData = getSubject(httpRequest, JWT_TOKEN_COOKIE_NAME, SIGNING_KEY);
        String redirectPath = new StringBuffer("http://")
                .append(request.getServerName())
                .append(":").append(request.getServerPort())
                .append(httpRequest.getRequestURI()).toString();
        Cookie[] cookies = httpRequest.getCookies();
        String sessionId = "";
        if (null != cookies) {
            for (Cookie cooky : cookies) {
                if ("JSESSIONID".equals(cooky.getName())) {
                    sessionId = cooky.getValue();
                }
            }
        }
        HttpSession session = httpRequest.getSession();
//        if (sessionId.equals(session.getId())) {
        if (null != cookieData) {
            String[] cookieArray = cookieData.split(":");
            String username = cookieArray[0];
            String bankcode = cookieArray[1];
            System.out.println("");
            System.out.println("herde namamamamama"+headerName);
            if (username == null || bankcode == null) {
                clear(httpresp, httpRequest, JWT_TOKEN_COOKIE_NAME);
                request.getRequestDispatcher(new StringBuffer(path).append(redirectPath).toString()).forward(request, response);
            } else if (session.getAttribute("user") == null) {


                session.setAttribute("user", username);
                if (!httpRequest.getRequestURI().equals(httpRequest.getContextPath() + "/erro403")) {
                    
                        
                     
                        
                        List<String> uac_accessList = (List<String>) session.getAttribute("uac_access");
                        if (!httpRequest.getRequestURI().matches(".*(css|jpg|png|gif|js|map|eot|svg|ttf|woff|woff2)$")) { 
                        if (uac_accessList.contains(httpRequest.getRequestURI())) {
                            //access granted
                            filterChain.doFilter(httpRequest, httpresp);
                        } else //unauthorized
                        {
                            if (null == headerName) {
                                System.out.println("Synchronous request");
                                httpresp.sendRedirect("erro403");
                            } else {
                                //Ajax Request
                                System.out.println("Ajax Request");
                                httpresp.getWriter().write(get401Source());
                            }
                        }
                }else{
                        
                        filterChain.doFilter(httpRequest, httpresp);
                        }
                    
                } else {
                    session.removeAttribute("uac_access");
                    filterChain.doFilter(httpRequest, httpresp);
                }
                
              

                // filterChain.doFilter(request, response);
            } else if (username.equals(session.getAttribute("user"))) {
                
 

                if (!httpRequest.getRequestURI().equals(httpRequest.getContextPath() + "/erro403")) {
                    
                      if (null == session.getAttribute("uac_access")) {
                        List<String> accessList = new ArrayList<>();
              
                        
                     
                        session.setAttribute("uac_access", accessList);
                    }
                    
                    List<String> uac_accessList = (List<String>) session.getAttribute("uac_access");
                   if (!httpRequest.getRequestURI().matches(".*(css|jpg|png|gif|js|map|eot|svg|ttf|woff|woff2)$")) {
                    if (uac_accessList.contains(httpRequest.getRequestURI())) {
                        //access granted
                        filterChain.doFilter(httpRequest, httpresp);
                    } else //unauthorized
                    {
                        if (null == headerName) {
                            System.out.println("Synchronous request");
                            httpresp.sendRedirect("erro403");
                        } else {
                            //Ajax Request
                            System.out.println("Ajax Request");
                            httpresp.getWriter().write(get401Source());
                        }
                    }
                     
                     }else{
                        
                        filterChain.doFilter(httpRequest, httpresp);
                        } 
                   
                } else {
                    session.removeAttribute("uac_access");
                    filterChain.doFilter(httpRequest, httpresp);
                }
            } else {
                clear(httpresp, httpRequest, JWT_TOKEN_COOKIE_NAME);
                httpresp.sendRedirect(new StringBuffer(path).append(redirectPath).toString());
            }
        } else {
            System.out.println("cokee data not found");
            clear(httpresp, httpRequest, JWT_TOKEN_COOKIE_NAME);
            httpresp.sendRedirect(new StringBuffer(path).append(redirectPath).toString());
        }
        
    }
    
    @Override
    public void destroy() {
        
    }
    /**
     *
     * @param httpServletRequest
     * @param jwtTokenCookieName
     * @param signingKey
     * @return
     */
     private String getSubject(HttpServletRequest httpServletRequest, String jwtTokenCookieName, String signingKey) {
        String token = getValue(httpServletRequest, jwtTokenCookieName);
        if (null == token) {
            return null;
        }
//        return Jwts.parser().setSigningKey(signingKey).parseClaimsJws(token).getBody().getSubject();
        return null;
    }

    /**
     *
     * @param httpServletRequest
     * @param name
     * @return
     */
    private String getValue(HttpServletRequest httpServletRequest, String name) {
        Cookie returnCookie = null;
        Cookie[] cookies = httpServletRequest.getCookies();
        if (cookies != null) {
            for (Cookie cooky : cookies) {
                if (cooky.getName().equals(name)) {
                    returnCookie = cooky;
                }
            }
        }

        // Cookie cookie = WebUtils.getCookie(httpServletRequest, name);
        return returnCookie != null ? returnCookie.getValue() : null;
    }

    

    /**
     *
     * @param httpServletResponse
     * @param name
     */
   private void clear(HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        cookie.setDomain(httpServletRequest.getServerName());
        httpServletResponse.addCookie(cookie);
    }
   
   private String get401Source(){
   return "  <div class=\"error-page\">\n" +
"                        <h2 class=\"headline text-red\">403</h2>\n" +
"\n" +
"                        <div class=\"error-content\">\n" +
"                            <h3><i class=\"fa fa-warning text-red\"></i> Oops! Something went wrong.</h3>\n" +
"\n" +
"                            <p>\n" +
"                                You have attempted to access a page that you are not authorized to view.\n" +
"\n" +
"                                If you have any questions, please contact the Security Administrator.\n" +
"                                \n" +
"                            </p>\n" +
"\n" +
"                            <form class=\"search-form\">\n" +
"                                <div class=\"input-group\">\n" +
"                                    <input type=\"text\" name=\"search\" class=\"form-control\" placeholder=\"Search\">\n" +
"\n" +
"                                    <div class=\"input-group-btn\">\n" +
"                                        <button type=\"submit\" name=\"submit\" class=\"btn btn-danger btn-flat\"><i class=\"fa fa-search\"></i>\n" +
"                                        </button>\n" +
"                                    </div>\n" +
"                                </div>\n" +
"                                <!-- /.input-group -->\n" +
"                            </form>\n" +
"                        </div>\n" +
"                    </div>";
   }
}
