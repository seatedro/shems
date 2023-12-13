/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./src/lucia.js").Auth;
  type DatabaseUserAttributes = {
    username: string;
    customer_id: number | null;
  };
  type DatabaseSessionAttributes = {};
}
