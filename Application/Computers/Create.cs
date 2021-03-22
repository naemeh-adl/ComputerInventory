using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Computers
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
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
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Computers.Add(request.Computer);

                var result=await _context.SaveChangesAsync()>0;
                if(!result) return Result<Unit>.Failure("Failed To Create Computer!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}