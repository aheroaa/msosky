using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Data.SqlClient;
using System.Web;
using System.Web.Routing;
using COM.CF;
using System.Data;
using System.Web.Script.Serialization;
using System.Reflection;
using System.Collections;
using System.Linq.Expressions;
namespace Utility
{
	public static class ExtMethod
	{
        //public static int GetCount(this string str, string sym)
        //{
        //    int num;
        //    num = ((string.IsNullOrEmpty(str) ? false : !string.IsNullOrEmpty(sym)) ? str.Length - str.Replace(sym, "").Length : 0);
        //    return num;
        //}

        //public static string GetStrBySym(this string str, string sym)
        //{
        //    string str1;
        //    if ((string.IsNullOrEmpty(str) ? false : !string.IsNullOrEmpty(sym)))
        //    {
        //        string result = null;
        //        Regex regex = new Regex(string.Concat("^.*?[\\]\\)\\s\\n\\*]+?(?<key>", sym, ")[\\[\\(\\s\\n\\*]+?.*?$"), RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
        //        if (regex.IsMatch(str))
        //        {
        //            bool isHas = false;
        //            result = str;
        //            while (regex.IsMatch(result))
        //            {
        //                result = result.Substring(regex.Match(result).Groups["key"].Index);
        //                if (result.GetCount("(") == result.GetCount(")"))
        //                {
        //                    isHas = true;
        //                    break;
        //                }
        //            }
        //            if (!isHas)
        //            {
        //                result = null;
        //            }
        //        }
        //        str1 = result;
        //    }
        //    else
        //    {
        //        str1 = null;
        //    }
        //    return str1;
        //}

        //public static int GetSymPosition(this string str, string sym)
        //{
        //    int num;
        //    if ((string.IsNullOrEmpty(str) ? false : !string.IsNullOrEmpty(sym)))
        //    {
        //        Regex regex = new Regex(string.Concat("^[\\s\\n]*?(?<key>", sym, ")[\\[\\(\\s\\n]+?.*?$"), RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
        //        num = (!regex.IsMatch(str) ? 0 : regex.Match(str).Groups["key"].Index + sym.Length);
        //    }
        //    else
        //    {
        //        num = 0;
        //    }
        //    return num;
        //}


        public static int GetCount(this string str, string sym)
        {
            if (String.IsNullOrEmpty(str) || String.IsNullOrEmpty(sym))
            {
                return 0;
            }
            else
            {
                return str.Length - str.Replace(sym, "").Length;
            }
        }
        public static int GetSymPosition(this string str, string sym)
        {
            if (String.IsNullOrEmpty(str) || String.IsNullOrEmpty(sym))
            {
                return 0;
            }
            else
            {
                Regex regex = new Regex(@"^[\s\n]*?(?<key>" + sym + @")[\[\(\s\n]+?.*?$", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
                if (regex.IsMatch(str))
                {
                    return regex.Match(str).Groups["key"].Index + sym.Length;
                }
                else
                {
                    return 0;
                }
            }
        }
        public static string GetStrBySym(this string str, string sym)
        {
            if (String.IsNullOrEmpty(str) || String.IsNullOrEmpty(sym))
            {
                return null;
            }
            else
            {
                string result = null;
                Regex regex = new Regex(@"^.*?[\]\)\s\n\*]+?(?<key>" + sym + @")[\[\(\s\n\*]+?.*?$", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Compiled);
                if (regex.IsMatch(str))
                {
                    bool isHas = false;
                    result = str;
                    while (regex.IsMatch(result))
                    {
                        result = result.Substring(regex.Match(result).Groups["key"].Index);
                        if (GetCount(result, "(") == GetCount(result, ")"))
                        {
                            isHas = true;
                            break;
                        }
                    }
                    if (!isHas)
                    {
                        result = null;
                    }
                }
                return result;
            }
        }

        #region ����ת��
        #region ǿת��int ���ʧ�ܷ��� 0
        /// <summary>
        /// ǿת��int ���ʧ�ܷ��� 0
        /// </summary>
        /// <param name="o"></param>
        /// <param name="i"></param>
        /// <returns></returns>
        public static int ToInt(this object o)
        {
            return PubFunc.GetInt(o);
        }
        /// <summary>
        /// ǿת��long ���ʧ�ܷ��� 0
        /// </summary>
        /// <param name="o"></param>
        /// <param name="i"></param>
        /// <returns></returns>
        public static long ToBigInt(this object o)
        {
            return PubFunc.GetBigInt(o);
        }
        #endregion
        #region ǿת��int ���ʧ�ܷ��� i
        /// <summary>
        /// ǿת��int ���ʧ�ܷ��� i
        /// </summary>
        /// <param name="o"></param>
        /// <param name="i"></param>
        /// <returns></returns>
        public static int ToInt(this object o, int i)
        {
            int reval = 0;
            if (o != null && int.TryParse(o.ToString(), out reval))
            {
                return reval;
            }
            return i;
        }
        #endregion
        #region ǿת��double ���ʧ�ܷ��� 0
        /// <summary>
        /// ǿת��double ���ʧ�ܷ��� 0
        /// </summary>
        /// <param name="o"></param>
        /// <param name="i"></param>
        /// <returns></returns>
        public static double ToDou(this object o)
        {
            double reval = 0;
            if (o != null && double.TryParse(o.ToString(), out reval))
            {
                return reval;
            }
            return 0;
        }
        #endregion
        #region ǿת��double ���ʧ�ܷ��� i
        /// <summary>
        /// ǿת��double ���ʧ�ܷ��� i
        /// </summary>
        /// <param name="o"></param>
        /// <param name="i"></param>
        /// <returns></returns>
        public static double ToDou(this object o, int i)
        {
            double reval = 0;
            if (o != null && double.TryParse(o.ToString(), out reval))
            {
                return reval;
            }
            return i;
        }
        #endregion
        #region ǿת��string ���ʧ�ܷ��� ""
        /// <summary>
        /// ǿת��string ���ʧ�ܷ��� ""
        /// </summary>
        /// <param name="o"></param>
        /// <param name="i"></param>
        /// <returns></returns>
        public static string ToConvertString(this object o)
        {
            if (o != null) return o.ToString().Trim();
            return "";
        }
        #endregion
        #region  ǿת��string ���ʧ�ܷ��� str
        /// <summary>
        /// ǿת��string ���ʧ�ܷ��� str
        /// </summary>
        /// <param name="o"></param>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string ToConvertString(this object o, string str)
        {
            if (o != null) return o.ToString().Trim();
            return str;
        }
        #endregion
        #region  ȥ���ַ�����/t/r/n/s
        /// <summary>
        ///ȥ���ַ�����/t/r/n/s
        /// </summary>
        /// <param name="o"></param>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string ToRemovetsrn(this string o)
        {
            if (o == null || o == "") return o;
            else
            {
                o = Regex.Replace(o, @"\t|\n|\s|\r", "");
            }
            return o;
        }
        /// <summary>
        ///ȥ���ַ�����/t/r/n/s
        /// </summary>
        /// <param name="o"></param>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string ToRemovetsrn(this string o, string str)
        {
            o = o.Replace(" ", "");
            if (o == null || o == "") return str;
            else
            {
                o = Regex.Replace(o, @"\t|\n|\s|\r", "");
            }
            return o;
        }
        #endregion
        #region ��ʽ��ʱ��
        /// <summary>
        /// ��ʽ��ʱ��
        /// </summary>
        /// <param name="o"></param>
        /// <param name="FormatStr"></param>
        /// <returns></returns>
        public static string ToDateStr(this object o, string FormatStr = "yyyy-MM-dd HH:mm")
        {
            if (o == null) return "";
            if (string.IsNullOrWhiteSpace(o.ToString())) return "";
            return Convert.ToDateTime(o).ToString(FormatStr);
        }
        /// <summary>
        /// ��ʽ��ʱ��
        /// </summary>
        /// <param name="o"></param>
        /// <param name="FormatStr"></param>
        /// <returns></returns>
        public static DateTime? ToDate(this string o)
        {
            DateTime reval = DateTime.Now;
            if (o != null && DateTime.TryParse(o.ToString(), out reval))
            {
                return reval;
            }
            return null;
        }
        #endregion
        #region ǿתGUID
        /// <summary>
        /// ǿתGUID
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static Guid ToGuid(this object o)
        {
            if (o == null) return Guid.Empty;
            else return Guid.Parse(o.ToString());
        }
        #endregion
        #endregion

        #region IEnumerableͨ����չ����
        #region Private expression tree helpers
        private static LambdaExpression GenerateSelector<TEntity>(String propertyName, out Type resultType) where TEntity : class
        {
            PropertyInfo property;
            Expression propertyAccess;
            var parameter = Expression.Parameter(typeof(TEntity), "Entity");

            if (propertyName.Contains('.'))
            {
                String[] childProperties = propertyName.Split('.');
                property = typeof(TEntity).GetProperty(childProperties[0]);
                propertyAccess = Expression.MakeMemberAccess(parameter, property);
                for (int i = 1; i < childProperties.Length; i++)
                {
                    property = property.PropertyType.GetProperty(childProperties[i]);
                    propertyAccess = Expression.MakeMemberAccess(propertyAccess, property);
                }
            }
            else
            {
                property = typeof(TEntity).GetProperty(propertyName);
                propertyAccess = Expression.MakeMemberAccess(parameter, property);
            }

            resultType = property.PropertyType;

            return Expression.Lambda(propertyAccess, parameter);
        }
        private static MethodCallExpression GenerateMethodCall<TEntity>(IQueryable<TEntity> source, string methodName, String fieldName) where TEntity : class
        {
            Type type = typeof(TEntity);
            Type selectorResultType;
            LambdaExpression selector = GenerateSelector<TEntity>(fieldName, out selectorResultType);
            MethodCallExpression resultExp = Expression.Call(typeof(Queryable), methodName,
            new Type[] { type, selectorResultType },
            source.Expression, Expression.Quote(selector));
            return resultExp;
        }
        #endregion

        public static IOrderedQueryable<TEntity> OrderBy<TEntity>(this IQueryable<TEntity> source, string fieldName) where TEntity : class
        {
            MethodCallExpression resultExp = GenerateMethodCall<TEntity>(source, "OrderBy", fieldName);
            return source.Provider.CreateQuery<TEntity>(resultExp) as IOrderedQueryable<TEntity>;
        }

        public static IOrderedQueryable<TEntity> OrderByDescending<TEntity>(this IQueryable<TEntity> source, string fieldName) where TEntity : class
        {
            MethodCallExpression resultExp = GenerateMethodCall<TEntity>(source, "OrderByDescending", fieldName);
            return source.Provider.CreateQuery<TEntity>(resultExp) as IOrderedQueryable<TEntity>;
        }


        public static IOrderedQueryable<TEntity> ThenBy<TEntity>(this IOrderedQueryable<TEntity> source, string fieldName) where TEntity : class
        {
            MethodCallExpression resultExp = GenerateMethodCall<TEntity>(source, "ThenBy", fieldName);
            return source.Provider.CreateQuery<TEntity>(resultExp) as IOrderedQueryable<TEntity>;
        }

        public static IOrderedQueryable<TEntity> ThenByDescending<TEntity>(this IOrderedQueryable<TEntity> source, string fieldName) where TEntity : class
        {
            MethodCallExpression resultExp = GenerateMethodCall<TEntity>(source, "ThenByDescending", fieldName);
            return source.Provider.CreateQuery<TEntity>(resultExp) as IOrderedQueryable<TEntity>;
        }
        public static IOrderedQueryable<TEntity> OrderUsingSortExpression<TEntity>(this IQueryable<TEntity> source, string sortExpression) where TEntity : class
        {
            String[] orderFields = sortExpression.Split(',');
            IOrderedQueryable<TEntity> result = null;
            for (int currentFieldIndex = 0; currentFieldIndex < orderFields.Length; currentFieldIndex++)
            {
                String[] expressionPart = orderFields[currentFieldIndex].Trim().Split(' ');
                String sortField = expressionPart[0];
                Boolean sortDescending = (expressionPart.Length == 2) && (expressionPart[1].Equals("DESC", StringComparison.OrdinalIgnoreCase));
                if (sortDescending)
                {
                    result = currentFieldIndex == 0 ? source.OrderByDescending(sortField) : result.ThenByDescending(sortField);
                }
                else
                {
                    result = currentFieldIndex == 0 ? source.OrderBy(sortField) : result.ThenBy(sortField);
                }
            }
            return result;
        }
        /// <summary>
        /// IEnumerableͨ����չ����
        /// </summary>     
        public static void ForEach<T>(this IEnumerable<T> List, Action<T> Action)
        {
            if (List == null) throw new ArgumentNullException("���ϲ���Ϊ��");
            if (Action == null) throw new ArgumentNullException("Action����Ϊ��");
            foreach (T item in List)
            {
                Action.Invoke(item);
            }
        }
        /// <summary>
        /// ��� ��������Ԫ����������һ��
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <param name="t"></param>
        /// <returns></returns>
        public static List<T> AddFirstItem<T>(this IEnumerable<T> list, T t)
        {
            List<T> reval = new List<T>();
            reval.Add(t);
            reval.AddRange(list);
            return reval;
        }
        public static void For<T>(this IEnumerable<T> List, int Start, int End, int Step, Action<T> Action)
        {
            for (int i = Start; i < End; i = i + Step)
            {
                Action.Invoke(List.ElementAt(i));
            }
        }
        public static void For<T>(this IEnumerable<T> List, int Start, Func<int, bool> End, int Step, Action<T> Action)
        {
            for (int i = Start; End.Invoke(i); i = i + Step)
            {
                Action.Invoke(List.ElementAt(i));
            }
        }
        public static void For<T>(this IEnumerable<T> List, int Start, Func<int, bool> End, int Step, Func<T, int, int> Action)
        {
            for (int i = Start; End.Invoke(i); i = i + Step)
            {
                i = Action.Invoke(List.ElementAt(i), i);
            }
        }


        #endregion

        #region string��չ����
        /// <summary>
        /// ��ʽ��
        /// </summary>
        /// <param name="o"></param>
        /// <param name="ps"></param>
        /// <returns></returns>
        public static string ToFormat(this string o, params object[] ps)
        {
            return string.Format(o, ps);
        }

        /// <summary>
        /// ����js�� "alert(1)".ToJavaScript(); ���ص�������JS����
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static string ToJavaScript(this string o)
        {
            return ("<script>" + o + "</script>");
        }

        /// <summary>
        ///���� alert; ���ص�������JS����
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static string ToAlert(this string o)
        {
            string js = "$.Zebra_Dialog('" + o + "')";
            return js.ToJavaScript();
        }

        /// <summary>
        ///���� alert;������ת
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static string ToAlertAndHref(this string message, string url)
        {
            string js = "alert(\"" + message + "\");window.location.href=\"" + url + "\"";
            return js.ToJavaScript();
        }
        /// <summary>
        /// ������ʾ������
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static string ToAlertBack(this string message)
        {
            return "alert('{0}');history.go(-1)".ToFormat(message).ToJavaScript();
        }

        /// <summary>
        /// �ֻ���ʽת�� 13812341234 ת��138-1234-1234
        /// </summary>
        /// <param name="pn">�ֻ���</param>
        /// <returns></returns>
        public static string ToPhone(this string phoneNum)
        {
            try
            {
                if (string.IsNullOrEmpty(phoneNum)) return "";
                return phoneNum.Substring(0, 3) + "-" + phoneNum.Substring(3, 4) + "-" + phoneNum.Substring(7);
            }
            catch (Exception)
            {
                return "";
            }
        }


        /// <summary>
        /// ����������ת�� SqlParameter[] 
        /// </summary>
        /// <param name="o">�� var o=new {id=1,name="����"}</param>
        /// <returns>SqlParameter[]</returns>
        public static SqlParameter[] ToPars(this object o)
        {
            List<SqlParameter> pars = new List<SqlParameter>();
            RouteValueDictionary rvd = new RouteValueDictionary(o);
            foreach (var r in rvd)
            {
                SqlParameter par;
                if (r.Value == null)
                {
                    par = new SqlParameter("@" + r.Key, DBNull.Value);
                }
                else
                {
                    par = new SqlParameter("@" + r.Key, r.Value);
                }
                pars.Add(par);
            }
            return pars.ToArray();
        }

        /// <summary>
        /// ����������ת�� SqlParameter[] 
        /// </summary>
        /// <param name="o">�� var o=new {id=1,name="����"}</param>
        /// <returns>SqlParameter[]</returns>
        public static string ToUrl(this object o)
        {
            RouteValueDictionary rvd = new RouteValueDictionary(o);
            string reval = "";
            foreach (var r in rvd)
            {
                if (reval != "") reval += "&";
                reval += (r.Key + "=" + r.Value);

            }
            return reval;
        }

        /// <summary>
        /// sql���˹ؼ���   
        /// </summary>
        /// <param name="objWord"></param>
        /// <returns></returns>
        public static string ToSqlFilter(this object objWord)
        {
            var str = objWord + "";
            str = str.Replace("'", "��");
            str = str.Replace(";", "��");
            str = str.Replace(",", ",");
            str = str.Replace("?", "?");
            str = str.Replace("<", "��");
            str = str.Replace(">", "��");
            str = str.Replace("(", "(");
            str = str.Replace(")", ")");
            str = str.Replace("@", "��");
            str = str.Replace("=", "��");
            str = str.Replace("+", "��");
            str = str.Replace("*", "��");
            str = str.Replace("&", "��");
            str = str.Replace("#", "��");
            str = str.Replace("%", "��");
            str = str.Replace("$", "��");
            return str;
        }
        /// <summary>
        /// �ָ��ַ���
        /// </summary>
        /// <param name="str"></param>
        /// <param name="?"></param>
        /// <returns></returns>
        public static List<string> Split(this string str, string spiltStr)
        {
            var reval = str.Split(new string[] { spiltStr }, StringSplitOptions.RemoveEmptyEntries).ToList();
            return reval;
        }

        /// <summary>
        /// htmlEncodeһ������ 
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static String HtmlEncode(this object o)
        {
            return HttpUtility.HtmlEncode(o) + "";
        }

        /// <summary>
        /// htmlDecodeһ���ַ���
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static String HtmlDecode(this object o)
        {
            if (o == null) return "";
            var s = o.ToString();
            if (string.IsNullOrWhiteSpace(s)) return "";
            return HttpUtility.HtmlDecode(s);
        }

        public static string UrlEncode(this string o)
        {
            return HttpContext.Current.Server.UrlEncode(o);
        }
        public static string UrlDecode(this string o)
        {
            return HttpContext.Current.Server.UrlDecode(o);
        }
        #endregion

        #region jsonת��
        /// <summary>
        /// �����л�
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="json"></param>
        /// <returns></returns>
        public static TEntity ToModel<TEntity>(this string json)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            return jsSerializer.Deserialize<TEntity>(json);
        }
        /// <summary>
        /// �������л�
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ToJson(this object obj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            return jsSerializer.Serialize(obj);
        }

        #endregion

        #region ����ת��
        /// <summary>
        /// ������תΪ��������
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static dynamic ToDynamic<T>(this List<T> obj)
        {
            if (obj == null || obj.Count == 0) return null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            return jsSerializer.Serialize(obj).ToModel<dynamic>();
        }

        /// <summary>
        /// ������תΪ��������
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static dynamic ToDynamic(this object obj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            return jsSerializer.Serialize(obj).ToModel<dynamic>();
        }

        /// <summary>
        /// ��������ת����DataTable
        /// </summary>
        /// <param name="list">����</param>
        /// <returns></returns>
        public static DataTable ToDataTable<T>(this List<T> list)
        {
            DataTable result = new DataTable();
            if (list.Count > 0)
            {
                PropertyInfo[] propertys = typeof(T).GetProperties();
                foreach (PropertyInfo pi in propertys)
                {
                    result.Columns.Add(pi.Name, pi.PropertyType);
                }

                for (int i = 0; i < list.Count; i++)
                {
                    ArrayList tempList = new ArrayList();
                    foreach (PropertyInfo pi in propertys)
                    {
                        object obj = pi.GetValue(list[i], null);
                        tempList.Add(obj);
                    }
                    object[] array = tempList.ToArray();
                    result.LoadDataRow(array, true);
                }
            }
            return result;
        }

        /// <summary>
        /// ��datatableתΪlist
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static List<T> ToList<T>(this DataTable dt)
        {
            var list = new List<T>();
            Type t = typeof(T);
            var plist = new List<PropertyInfo>(typeof(T).GetProperties());

            foreach (DataRow item in dt.Rows)
            {
                T s = System.Activator.CreateInstance<T>();
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    PropertyInfo info = plist.Find(p => p.Name == dt.Columns[i].ColumnName);
                    if (info != null)
                    {
                        if (!Convert.IsDBNull(item[i]))
                        {
                            info.SetValue(s, item[i], null);
                        }
                    }
                }
                list.Add(s);
            }
            return list;
        }


        /// <summary>
        /// ��HTML����ת���ɴ��ı���ʽ����ȥ��HTML��ʽ
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        public static string HtmlToText(this string source)
        {
            string result;            //remove line breaks,tabs
            result = source.Replace("\r", " ");
            result = result.Replace("\n", " ");
            result = result.Replace("\t", " ");

            //remove the header
            result = Regex.Replace(result, "(<head>).*(</head>)", string.Empty, RegexOptions.IgnoreCase);

            result = Regex.Replace(result, @"<( )*script([^>])*>", "<script>", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"(<script>).*(</script>)", string.Empty, RegexOptions.IgnoreCase);

            //remove all styles
            result = Regex.Replace(result, @"<( )*style([^>])*>", "<style>", RegexOptions.IgnoreCase); //clearing attributes
            result = Regex.Replace(result, "(<style>).*(</style>)", string.Empty, RegexOptions.IgnoreCase);

            //insert tabs in spaces of <td> tags
            result = Regex.Replace(result, @"<( )*td([^>])*>", " ", RegexOptions.IgnoreCase);

            //insert line breaks in places of <br> and <li> tags
            result = Regex.Replace(result, @"<( )*br( )*>", "\r\n", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"<( )*li( )*>", "\r\n", RegexOptions.IgnoreCase);

            //insert line paragraphs in places of <tr> and <p> tags
            result = Regex.Replace(result, @"<( )*tr([^>])*>", "\r\n", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"<( )*p([^>])*>", "\r\n", RegexOptions.IgnoreCase);

            //remove anything thats enclosed inside < >
            result = Regex.Replace(result, @"<[^>]*>", string.Empty, RegexOptions.IgnoreCase);

            //replace special characters:
            result = Regex.Replace(result, @"&", "&", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @" ", " ", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"<", "<", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @">", ">", RegexOptions.IgnoreCase);
            result = Regex.Replace(result, @"&(.{2,6});", string.Empty, RegexOptions.IgnoreCase);

            //remove extra line breaks and tabs
            result = Regex.Replace(result, @" ( )+", " ");
            result = Regex.Replace(result, "(\r)( )+(\r)", "\r\r");
            result = Regex.Replace(result, @"(\r\r)+", "\r\n");

            //remove blank
            result = Regex.Replace(result, @"\s", "");

            return result;
        }


        #endregion

        #region �߼�
        /// <summary>
        /// o==true ����successVal���򷵻�errorVal
        /// </summary>
        /// <param name="o"></param>
        /// <param name="successVal"></param>
        /// <param name="errorVal"></param>
        /// <returns></returns>
        public static string IIF(this object o, string successVal, string errorVal)
        {
            return Convert.ToBoolean(o) ? successVal : errorVal;
        }

        /// <summary>
        /// o==true ����successVal���򷵻�errorVal
        /// </summary>
        /// <param name="o"></param>
        /// <param name="successVal"></param>
        /// <param name="errorVal"></param>
        /// <returns></returns>
        public static string IIF(this object o, string successVal)
        {
            return Convert.ToBoolean(o) ? successVal : "";
        }

        /// <summary>
        /// o==true ִ��success ����ִ�� error
        /// </summary>
        /// <param name="o"></param>
        /// <param name="success"></param>
        /// <param name="error"></param>
        public static void IIF(this object o, Action<dynamic> success, Action<dynamic> error)
        {
            if (Convert.ToBoolean(o))
            {
                success(o);
            }
            else
            {
                error(error);
            }
        }

        /// <summary>
        /// �Ƿ���null��""
        /// </summary>
        /// <returns></returns>
        public static bool IsNE(this object o)
        {
            if (o == null || o == DBNull.Value) return true;
            return o.ToString() == "";
        }

        public static string IsNE(this string o, string s)
        {
            return o.IsNE() ? s : o;
        }

        /// <summary>
        /// �Ƿ���null��""
        /// </summary>
        /// <returns></returns>
        public static bool IsNE_ByGuidNull(this Guid? o)
        {
            if (o == null) return true;
            return o == Guid.Empty;
        }
        /// <summary>
        /// �Ƿ���null��""
        /// </summary>
        /// <returns></returns>
        public static bool IsNE_ByGuid(this Guid o)
        {
            if (o == null) return true;
            return o == Guid.Empty;
        }

        /// <summary>
        /// �Ƿ���null��""
        /// </summary>
        /// <returns></returns>
        public static bool IsntNE(this object o)
        {
            return !o.IsNE();
        }
        /// <summary>
        /// �Ƿ���INT
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static bool IsInt(this object o)
        {
            if (o == null) return false;
            return Regex.IsMatch(o.ToString(), @"^\d+$");
        }
        /// <summary>
        /// �Ƿ���INT
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static bool IsntInt(this object o)
        {
            if (o == null) return true;
            return !Regex.IsMatch(o.ToString(), @"^\d+$");
        }
        #endregion

        #region ����
        /// <summary>
        /// �������Զ��Ÿ�
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        public static string ToJoin(this object[] array)
        {
            if (array == null || array.Length == 0)
            {
                return "";
            }
            else
            {
                return string.Join(",", array.Where(c => c != null).Select(c => c.ToString().Trim()));
            }
        }
        /// <summary>
        /// ������תΪ '1','2' ���ָ�ʽ���ַ��� ���� where id in(  )
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        public static string ToJoinSqlInVal(this object[] array)
        {
            if (array == null || array.Length == 0)
            {
                return "";
            }
            else
            {
                return string.Join(",", array.Where(c => c != null).Select(c => "'" + c.ToSqlFilter() + "'"));//��ֹSQLע��
            }
        }
        /// <summary>
        /// ������תΪ '1','2' ���ָ�ʽ���ַ��� ���� where id in(  )
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        public static string ToJoinSqlInVal(this Guid[] array)
        {
            if (array == null || array.Length == 0)
            {
                return "";
            }
            else
            {
                return string.Join(",", array.Where(c => c != null).Select(c => "'" + c.ToSqlFilter() + "'"));//��ֹSQLע��
            }
        }
        #endregion
	}
}



