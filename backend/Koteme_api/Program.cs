using Microsoft.OpenApi.Models;
using koteme_api.Services;
using koteme_api.Repository;
using koteme_api.Interfaces.Services;
using koteme_api.Interfaces.Repositories;


var builder = WebApplication.CreateBuilder(args);

// Configure services before building the app
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v0", new OpenApiInfo { Title = "KoteMe API", Version = "v0" });

  // Habilita suporte a Data Annotations
  c.UseAllOfToExtendReferenceSchemas();
  c.EnableAnnotations();
});
builder.Services.AddControllers();
builder.Services.AddScoped<IAuthServices, AuthServices>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();

var app = builder.Build();

app.UseCors(c =>
{
  c.AllowAnyHeader();
  c.AllowAnyMethod();
  c.AllowAnyOrigin();
});

if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
  app.UseAuthentication();
  app.UseAuthorization();
  app.UseSwagger(c =>
    {
      c.RouteTemplate = "swagger/{documentName}/swagger.json";
    });
  app.UseSwaggerUI(c =>
    {
      c.SwaggerEndpoint("/swagger/v0/swagger.json", "KoteMeApi V0");
    });
}



app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
