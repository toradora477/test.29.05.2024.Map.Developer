import { Router } from 'express';
import { AppDataSource } from '../../dataSource';
import { Marker } from '../../entity/Marker';
import { Like } from 'typeorm';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { lat, lng, comment } = req.body;
    const markerRepository = AppDataSource.getRepository(Marker);
    const newMarker = markerRepository.create({ lat, lng, comment });
    await markerRepository.save(newMarker);
    console.log(newMarker);
    res.status(201).json(newMarker);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lat, lng, comment, updatedAt } = req.body;
    const markerRepository = AppDataSource.getRepository(Marker);
    const marker = await markerRepository.findOneBy({ id: parseInt(id) });
    if (!marker) return res.status(404).json({ message: 'Marker not found' });
    marker.lat = lat;
    marker.lng = lng;
    marker.comment = comment;
    marker.updatedAt = updatedAt;
    await markerRepository.save(marker);
    console.log(marker);
    res.json(marker);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { comment, limit, offset } = req.query;
    const markerRepository = AppDataSource.getRepository(Marker);

    const queryOptions: any = {};
    if (comment) {
      queryOptions.comment = Like(`%${comment}%`);
    }

    const [result, total] = await markerRepository.findAndCount({
      where: queryOptions,
      take: limit ? parseInt(limit as string) : undefined,
      skip: offset ? parseInt(offset as string) : undefined,
    });
    console.log({ lengthData: result?.length });
    res.json({ total, result });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const markerRepository = AppDataSource.getRepository(Marker);
    const marker = await markerRepository.findOneBy({ id: parseInt(id) });
    if (!marker) return res.status(404).json({ message: 'Marker not found' });
    console.log(marker);
    res.json(marker);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const markerRepository = AppDataSource.getRepository(Marker);
    const result = await markerRepository.delete(id);
    if (result.affected === 0) return res.status(404).json({ message: 'Marker not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.get('/stats/total', async (req, res, next) => {
  try {
    const markerRepository = AppDataSource.getRepository(Marker);
    const count = await markerRepository.count();
    console.log(count);
    res.json({ total: count });
  } catch (err) {
    next(err);
  }
});

export default router;
