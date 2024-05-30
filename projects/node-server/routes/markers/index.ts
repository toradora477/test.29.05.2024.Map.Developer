import { Router, Request, Response, NextFunction } from 'express';
// import axios from 'axios';
// import { ExtendedError } from '../../tools';
// import { guestJWT } from '../../middlewares/jwtAudit';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transportationData = {
      status: true,
      data: 'текст',
    };

    console.log('post');
    console.log(transportationData);

    res.status(200).json(transportationData);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const API_NOVA_POSHTA_KEY: string = process.env.API_NOVA_POSHTA_KEY || '';
    // const API_NOVA_POSHTA_URL: string = process.env.API_NOVA_POSHTA_URL || '';

    // const response = await axios.post(API_NOVA_POSHTA_URL, {
    //   apiKey: API_NOVA_POSHTA_KEY,
    //   modelName: 'Address',
    //   calledMethod: 'getWarehouses',
    // });

    // if (!response?.data?.success || !response?.data?.data) {
    //   // throw new ExtendedError({
    //   //   messageLog: 'Poor axios post result.',
    //   //   messageJson: 'Помилка сервера. Не вдалося завантажити список відділень.',
    //   // });
    // }

    // const filteredData = response.data.data.map((branch: any) => ({
    //   Description: branch.Description,
    //   SettlementAreaDescription: branch.SettlementAreaDescription,
    //   SettlementDescription: branch.SettlementDescription,
    // }));

    const transportationData = {
      status: true,
      data: 'текст',
    };

    console.log('get');
    console.log(transportationData);

    // req.setLoggingData({
    //   log: 'Get filtered list nova poshta branches',
    //   operation: 'axios post api nova poshta',
    //   dataLength: transportationData?.data?.length ?? null,
    // });
    res.status(200).json(transportationData);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const API_NOVA_POSHTA_KEY: string = process.env.API_NOVA_POSHTA_KEY || '';
    // const API_NOVA_POSHTA_URL: string = process.env.API_NOVA_POSHTA_URL || '';

    // const response = await axios.post(API_NOVA_POSHTA_URL, {
    //   apiKey: API_NOVA_POSHTA_KEY,
    //   modelName: 'Address',
    //   calledMethod: 'getWarehouses',
    // });

    // if (!response?.data?.success || !response?.data?.data) {
    //   // throw new ExtendedError({
    //   //   messageLog: 'Poor axios post result.',
    //   //   messageJson: 'Помилка сервера. Не вдалося завантажити список відділень.',
    //   // });
    // }

    // const filteredData = response.data.data.map((branch: any) => ({
    //   Description: branch.Description,
    //   SettlementAreaDescription: branch.SettlementAreaDescription,
    //   SettlementDescription: branch.SettlementDescription,
    // }));

    const transportationData = {
      status: true,
      data: 'текст',
    };

    console.log('delete');
    console.log(transportationData);

    // req.setLoggingData({
    //   log: 'Get filtered list nova poshta branches',
    //   operation: 'axios post api nova poshta',
    //   dataLength: transportationData?.data?.length ?? null,
    // });
    res.status(200).json(transportationData);
  } catch (error) {
    next(error);
  }
});

export default router;
