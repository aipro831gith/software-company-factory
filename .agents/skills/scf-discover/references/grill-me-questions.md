# "Grill Me" Edge-Case Question Bank (`scf-discover`)

Pick **3 to 5** relevant questions from the matching domain below. Translate naturally into simple Hinglish or everyday English, and provide a smart default recommendation for each so the Founder can answer quickly.

---

## A. Jewelry, Retail & POS Billing Edge Cases
1. **Mixed Payment Modes:** Customer ek hi bill mein cash + UPI + card + old gold exchange + udhaar (credit) mix kare toh bill kaise split hoga?
2. **Gross Weight vs. Net Weight vs. Wastage:** Stone/meena weight alag minus hoga ya total weight par making charge lagega? Per-gram making charge ya percentage (%)?
3. **Rate Lock on Estimate vs. Final Bill:** Agar kachcha estimate subah bana aur pakka GST bill 3 din baad bana jab gold rate badal gaya, toh rate kaunsa lagega?
4. **Cancelled / Edited Invoices:** GST rule ke hisaab se pakka invoice banne ke baad delete nahi kar sakte — kya staff sirf Credit Note / Cancel reason ke saath void karega?
5. **Round-Off Rule:** Bill agar ₹48,321.40 aaye, toh ₹48,321 ya ₹48,322 round-off hoga aur accounting ledger mein round-off alag dikhega?

## B. Finance, Khata & Banking-Grade Edge Cases
1. **Double-Click / Duplicate Payment:** Agar internet slow ho aur user "Pay / Save" button 2 baar daba de, toh duplicate entry kaise rukegi? *(Plain meaning of Idempotency Key + Google search)*
2. **Concurrent Edits:** Agar do staff members ek hi customer ka udhaar balance ek saath update karein, toh balance galat na ho iske liye kya rule ho?
3. **Negative / Zero / Huge Values:** Agar koi quantity `-5` ya making charge `-100` enter karne ki koshish kare, toh system turant block karega.
4. **Backdated Entries:** Kya staff pichli tareekh (backdate) ka bill ya voucher daal sakta hai, ya sirf Boss permission se?

## C. SaaS, Multi-User & Hardware/Offline Edge Cases
1. **Staff Leaving the Job:** Agar koi salesman dukaan chhod kar jaye, toh uska login 1 click mein band ho aur uske purane bills safe rahein?
2. **Offline / Power Cut:** Agar laptop/browser achanak band ho jaye ya Wi-Fi chala jaye, toh aadha bhara hua form ya draft bachna chahiye?
3. **Device Access:** Kya staff apna phone ghar le jakar dukaan ka customer data dekh sakta hai, ya sirf dukaan ke IP/hours mein login allow hoga?
