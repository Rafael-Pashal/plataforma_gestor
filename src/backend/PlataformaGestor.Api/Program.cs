var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.AddHealthChecks();

var app = builder.Build();
app.UseExceptionHandler();
if (app.Environment.IsDevelopment()) app.MapOpenApi();
app.MapHealthChecks("/health");
app.MapGet("/api/v1/status", () => Results.Ok(new
{
    service = "Plataforma Gestor API",
    status = "ok",
    timestampUtc = DateTimeOffset.UtcNow
})).WithName("GetStatus");
app.Run();

public partial class Program;
