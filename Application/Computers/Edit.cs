using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Computers
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Computer Computer { get; set; }
        }
public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Computer).SetValidator(new ComputerValidator());
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var Computer = await _context.Computers.FindAsync(request.Computer.Id);

                _mapper.Map(request.Computer, Computer);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}