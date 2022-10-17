import {Request, Response} from "express";
import {AppDataSource} from "../../db";
import {Plane} from "../models/Plane";

exports.getPlanes = async function (req: Request, res: Response) {
    const allPlanes = await AppDataSource.getRepository(Plane).find({
        relations: {
            airline: true,
        }
    });
    res.json(allPlanes);

    // const plane = await AppDataSource // аналогичный метод через QueryBuilder
    //     .getRepository(Plane)
    //     .createQueryBuilder("plane")
    //     .leftJoinAndSelect("plane.airline", "airline")
    //     .getMany()
    // res.json(plane);
}

exports.getPlaneById = async function (req: Request, res: Response) {
    const plane = await AppDataSource.getRepository(Plane).findOne({
        where: {
            id: +req.params.id,
        },
        relations: {
            airline: true,
        }
    })
    if (plane) {
        res.json(plane);
    } else res.sendStatus(404);
}

exports.createPlane = async function (req: Request, res: Response) {
    const plane = new Plane();
    plane.model = req.body.model;
    plane.year = req.body.year;
    plane.totalPlaces = req.body.totalPlaces;
    plane.airline = req.body.airline;
    await AppDataSource.getRepository(Plane).save(plane);
    res.json(plane);
}

exports.updatePlane = async function (req: Request, res: Response) {
    const plane = await AppDataSource.getRepository(Plane).findOneBy({
        id: +req.params.id,
    });
    if (plane) {
        AppDataSource.getRepository(Plane).merge(plane, req.body)
        res.json(await AppDataSource.getRepository(Plane).save(plane));
    } else res.sendStatus(404);
}

exports.deletePlane = async function (req: Request, res: Response) {
    const plane = await AppDataSource.getRepository(Plane).findOneBy({
        id: +req.params.id,
    })
    if (plane) {
        await AppDataSource.getRepository(Plane).delete(plane);
        res.json(plane);
    } else res.sendStatus(404);
}
