using Ipfs.Engine;
using Microsoft.AspNetCore.Mvc;

namespace FileStore.Controller;

[ApiController]
[Route("/api/[action]")]
public class FileApiController : ControllerBase
{
	private readonly IpfsEngine engine;
	private readonly ILogger<FileApiController> logger;
	public FileApiController(
		IpfsEngine engine,
	ILogger<FileApiController> logger
	)
	{
		this.engine = engine;
		this.logger = logger;
	}

	[HttpPost]
	public async Task<IActionResult> CreateAsync(CreateModel model)
	{
		MemoryStream stream = new MemoryStream(
			Convert.FromBase64String(model.Base64String)
		);
		logger.LogInformation($"{stream.Length} bytes received");

		logger.LogInformation($"Uploading to Ipfs server");
		var ipfsFile = await engine.FileSystem.AddAsync(stream);
		logger.LogInformation($"Uploaded to Ipfs server");

		return Ok(new
		{
			Id = ipfsFile.Id.ToString(),
		});
	}

	[HttpGet]
	[Route("{id}")]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status200OK)]
	public async Task<IActionResult> GetFileAsync([FromRoute] string id)
	{
		var ipfsFile = await engine.FileSystem.GetAsync(id);
		if (ipfsFile is null)
		{
			logger.LogWarning($"File with given id, {id} doesn't exist.");
			return NotFound();
		}
		MemoryStream stream = new MemoryStream();
		ipfsFile.CopyTo(stream);
		logger.LogInformation($"File of length {stream.Length} received.");

		return Ok(new
		{
			base64string = Convert.ToBase64String(stream.ToArray()),
		});
	}
}

public record CreateModel(string Base64String);