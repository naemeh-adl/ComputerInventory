using Domain;
using FluentValidation;

namespace Application.Computers
{
    public class ComputerValidator : AbstractValidator<Computer>
    {
        public ComputerValidator()
        {
            RuleFor(x=>x.Type).NotNull().NotEmpty();
            RuleFor(x=>x.brand).NotNull().NotEmpty();
            RuleFor(x=>x.usbNum).GreaterThanOrEqualTo(0);
            RuleFor(x=>x.quantity).GreaterThanOrEqualTo(0);
            RuleFor(x=>x.ramSlotsNum).GreaterThanOrEqualTo(0);
        }
    }
}