CREATE VIEW `view_usuario_psicologo` AS
SELECT 
 CAST( CONCAT(U.ID,P.ID) as UNSIGNED) as id,
 U.id as usuario_id,
 P.id as psicologo_id,
 A.id as agenda_id,
 U.nome,
 U.email,
 U.papel,
 U.admin,
 P.crp,
 P.especialidade,
 P.codigo
FROM USUARIO U
JOIN PSICOLOGO P ON P.usuario_id = U.id
LEFT JOIN AGENDA A ON A.id = P.agenda_id
WHERE U.papel = 'P'