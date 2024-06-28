using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

builder.Services.AddDefaultIdentity<ApplicationUser>(
      options => options.SignIn.RequireConfirmedAccount = true)
    .AddApiEndpoints()
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();

// TODO: Not sure if this is needed. Need to understand authorization 'roles',
//   'claims' and 'policies". Hence leave it out for now.
//builder.Services.AddAuthorization();

// Swagger generator
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();
app.MapIdentityApi<ApplicationUser>();

// middleware to serve Swagger UI & JSON endpoints
app.UseSwagger();
app.UseSwaggerUI();

app.Run();
