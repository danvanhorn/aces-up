/*
 * This file was automatically generated by EvoSuite
 * Sat Dec 02 21:34:35 GMT 2017
 */

package models;

import org.junit.Test;
import static org.junit.Assert.*;
import models.Column;
import org.evosuite.runtime.EvoRunner;
import org.evosuite.runtime.EvoRunnerParameters;
import org.junit.runner.RunWith;

@RunWith(EvoRunner.class) @EvoRunnerParameters(mockJVMNonDeterminism = true, useVFS = true, useVNET = true, resetStaticState = true, separateClassLoader = true) 
public class Column_ESTest extends Column_ESTest_scaffolding {

  @Test(timeout = 4000)
  public void test0()  throws Throwable  {
      Column column0 = new Column();
      assertEquals(0, column0.id);
  }

  @Test(timeout = 4000)
  public void test1()  throws Throwable  {
      Column column0 = new Column((-2161));
      assertEquals((-2161), column0.id);
  }
}
