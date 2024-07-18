using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims; // ClaimsPrincipal, ClaimsTypes

using backend.Authorization;
using backend.Data;
using backend.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration["StlMarkets:ConnectionString"];
var Major = builder.Configuration.GetValue<int>("MySQL:Major");
var Minor = builder.Configuration.GetValue<int>("MySQL:Minor");
var Build = builder.Configuration.GetValue<int>("MySQL:Build");
var serverVersion = new MySqlServerVersion(
    new Version(Major, Minor, Build));

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, serverVersion));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddIdentityApiEndpoints<ApplicationUser>(options => {
    // TODO: probably a good idea require (some kind of) confirmation. Disable
    //  'confirmation' for our MVP for now though.
    options.SignIn.RequireConfirmedAccount = false;
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication();
// TODO: understand authorization more
//  claims - key/value pair that represents the subject
//  roles - Identity can be assigned roles, which provide it with certain claims
//  policies - set of one or more requirements on user to be "authorized"
// register polic(y|ies)
builder.Services.AddAuthorization(options =>
    options.AddPolicy("OwnerOnly", policy =>
        policy.Requirements.Add(new OwnerOnlyRequirement()))
);
// TODO: understand DI AddTransient(), AddScoped(), AddTransient()
// register authorization handler(s)
builder.Services.AddScoped<IAuthorizationHandler, OwnerOnlyHandler>();
builder.Services.AddScoped<IAuthorizationHandler, ReviewerOnlyHandler>();

// Swagger generator
// TODO: see https://aka.ms/aspnetcore/swashbuckle (about configuring)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add google photos API as a service
builder.Services.AddGooglePhotos();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Add auth middleware.
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
// Add "out-of-the-box" auth endpoints, e.g.
// - POST /register
// - POST /login
app.MapIdentityApi<ApplicationUser>();
// Add auth endpoints not available "out-of-the-box".
app.MapPost("/logout",
    async (SignInManager<ApplicationUser> signInManager) => {
        // Remove auth cookie (user no longer authenticated).
        await signInManager.SignOutAsync();
        return Results.Ok();
    }).RequireAuthorization();
app.MapGet("/pingauth", (ClaimsPrincipal user) => {
    // If user is logged in (.RequireAuthorization()),
    // -> get user's email, return e-mail as plain text
    // else,
    // -> return not authorized error code (401? 403?).
    // Needed for (http) cookie-based auth scheme...
    // - Cookie exists in browser, but
    // - React app will not have access to cookie. So,
    // - for React app to know user is authenticated, app needs to check with
    //   the server. If user is logged in, server tells app identity of the
    //   user that is logged in by sending user's email back.

    var email = user.FindFirstValue(ClaimTypes.Email);
    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
    return Results.Json(new {Email = email, UserId = userId});
}).RequireAuthorization();

// middleware to serve Swagger UI & JSON endpoints
app.UseSwagger();
app.UseSwaggerUI();

app.Run();
