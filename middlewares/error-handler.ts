import type { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction // Thêm '_' để ts và eslint bỏ qua unused parameter vì next buộc phải khai báo
) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err instanceof Error ? err.message : 'Internal Server Error'
  });
};