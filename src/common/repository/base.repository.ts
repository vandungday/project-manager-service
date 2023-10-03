import { Injectable } from '@nestjs/common';
import { AggregateOptions, FilterQuery, Model, PipelineStage, QueryOptions } from 'mongoose';
import { BaseSchema } from '../schemas/base.schema';

@Injectable()
export class BaseRepository<T extends BaseSchema> {
    constructor(private model: Model<T>) { }

    async create(dto: Partial<T>): Promise<T> {
        return await this.model.create(dto);
    }

    async insertMany(dto: Partial<T>[]) {
        return await this.model.insertMany(dto);
    }

    async findById(id: string): Promise<T> {
        return await this.model.findById(id).lean();
    }

    async findOne(condition: FilterQuery<T>): Promise<T> {
        return await this.model
            .findOne({
                ...condition,
            })
            .lean();
    }

    async find(condition: FilterQuery<T>, options?: QueryOptions<T>): Promise<Array<T>> {
        return await this.model.find({ ...condition }, options?.projection, options).lean();
    }

    async findOneAndUpdate(condition: FilterQuery<T>, dto: Partial<T>): Promise<T> {
        return await this.model.findOneAndUpdate({ ...condition }, dto, { new: true }).lean();
    }

    async updateMany(condition: FilterQuery<T>, dto: Partial<T>): Promise<Array<T>> {
        return await this.model.updateMany({ ...condition }, dto, { new: true }).lean();
    }

    async findOneAndDelete(condition: FilterQuery<T>): Promise<boolean> {
        return !!(await this.model.findOneAndDelete({ ...condition }));
    }

    async deleteMany(condition: FilterQuery<T>): Promise<boolean> {
        return !!(await this.model.deleteMany({ ...condition }));
    }

    async aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<any> {
        return await this.model.aggregate(pipeline, options);
    }
}
