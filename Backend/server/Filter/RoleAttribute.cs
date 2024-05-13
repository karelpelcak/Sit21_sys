using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

[AttributeUsage(AttributeTargets.Method)]
public class RoleAttribute : Attribute, IAuthorizationFilter
{
    private readonly string _role;

    public RoleAttribute(string role)
    {
        _role = role;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // Check if user is authenticated
        if (!context.HttpContext.User.Identity.IsAuthenticated)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        // Check if user has the required role
        if (!context.HttpContext.User.IsInRole(_role))
        {
            context.Result = new ForbidResult();
            return;
        }
    }
}
