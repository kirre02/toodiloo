import { InternalServerErrorException, NotAcceptableException } from "@nestjs/common/exceptions";

function errorHandler(error: any) {
    const errType = error.constructor.name;

    switch(errType) {
        case "PrismaClientValidationError": 
            throw new NotAcceptableException("Not valid data type");
        default:
            throw new InternalServerErrorException("Was not able to perform the task");
    }
}

export default errorHandler;