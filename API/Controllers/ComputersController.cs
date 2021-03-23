using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Computers;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ComputersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetComputers()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComputer(Guid id)
        {
            return(HandleResult(await Mediator.Send(new Details.Query{Id = id})));
        }

        [HttpPost]
        public async Task<IActionResult> CreateComputer(Computer Computer)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Computer = Computer}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditComputer(Guid id, Computer Computer)
        {
            Computer.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Computer = Computer}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComputer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
    
}