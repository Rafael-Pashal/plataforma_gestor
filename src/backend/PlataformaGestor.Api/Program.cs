var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();

var app = builder.Build();
app.UseExceptionHandler();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapHealthChecks("/health");
app.MapGet("/api/v1/status", () => Results.Ok(new
{
    service = "Plataforma Gestor API",
    status = "ok",
    timestampUtc = DateTimeOffset.UtcNow
})).WithName("GetStatus");
app.Run();

public partial class Program;
