import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET; // יש להחליף זאת במפתח הסודי המתאים לך

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.log('Missing JWT');
    return res.status(401).json({ error: 'Unauthorized - Missing JWT' });
  }

  verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Invalid JWT');
      return res.status(403).json({ error: 'Forbidden - Invalid JWT' });
    }

    // אם האימות עבר בהצלחה, הוסף את המשתמש ל-request כדי שיוכל להשתמש בו בהמשך
    // req.user = user;

    // console.log('JWT Authenticated');
    
    next();
  });
};

export default authenticateJWT;
