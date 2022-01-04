# starstruck
Seek your fortune!

## This demonstrates:

1.  Using servers to execute "sensitive" code ie. remote decision makers

2.  Using servers to protect access to sensitive data ie. traffic cops

3.  Sending information to the server using <form> and query strings

4.  Sending information to the server via dynamic routes

5.  Defining "catch all" error scenarios to gracefully handle client request errors

6.  Sending information to the server in the body of a POST request using <form>

7.  Retrieving information from the body of a POST request with Express

else{
 response.status(404);
 response.setHeader('Content-Type', 'text/html')
 response.render("error", {
   "errorCode":"404"
 });
}


<img src="<%=data.opponentPhoto%>" height=150 />
<h2><%=data.opponentName%> threw <%=data.opponentThrow%></h2>
<h2>You threw <%=data.playerThrow%></h2>

<h1>You <%=data.outcome%>!</h1>
