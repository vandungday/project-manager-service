import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVersionDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    enviromentId: string;

    @IsString()
    @IsOptional()
    description?: string;


    @IsString()
    @IsOptional()
    changeLog?: string;

    @IsString()
    @IsOptional()
    branchName?: string;

    @IsString()
    @IsOptional()
    attachmentFile?: string;

    @IsDate()
    @IsOptional()
    releaseDate?: Date

    @IsBoolean()
    @IsOptional()
    isActive?: Boolean;
}
