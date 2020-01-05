const Koa = require("koa");
const Router = require("koa-router");
// 生成令牌、验证令牌
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");

/**
 * json web token 简称jwt
 * 格式为: head.payload.hash
 * head: {
 *  typ : "JWT",    （typ：类型）
 *  alg : "HS256" （alg：算法，HS256表示哈希算法的mac值。SHA256/HmacSHA256)
 * }
 * payload: json
 * hash: 签名（将上面的两个部分组合在一起+本地信息做的一个的签名（头部在前）
 */

// 生成数字签名的秘钥
const secret = "it's a secret";

const app = new Koa();
const router = new Router();

router.get("/api/login", async ctx => {
  const { username, passwd } = ctx.query;
  console.log(username, passwd);

  if (username == "zlh" && passwd == "123") {
    // 生成令牌
    const token = jwt.sign(
      {
        data: { name: "zlh" }, // 用户信息数据
        exp: Math.floor(Date.now() / 1000) + 60  // 过期时间60s
      },
      secret
    );
    ctx.body = { code: 1, token };
  } else {
    ctx.status = 401;
    ctx.body = { code: 0, message: "用户名或者密码错误" };
  }
});

router.get(
  "/api/userinfo",
  jwtAuth({ secret }),
  async ctx => {
    ctx.body = { code: 1, data: { name: "jerry", age: 20 } };
  }
);
app.use(router.routes());
app.listen(3000);